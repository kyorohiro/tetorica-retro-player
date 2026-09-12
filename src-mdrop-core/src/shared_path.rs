use axum::http::StatusCode;
use std::path::{Path, PathBuf};

/// Resolve existing shared entries, rejecting traversal and symlink escapes.
/// Leading '/' is the mDrop UI's virtual folder root, not an OS absolute path.
pub(crate) fn resolve_shared_path(base: &Path, subpath: &str) -> Result<PathBuf, (StatusCode, String)> {
    let mut candidate = base.to_path_buf();
    for part in subpath.split('/') {
        if part.is_empty() || part == "." { continue; }
        if part == ".." || part.contains('\\') || part.contains(':') {
            return Err((StatusCode::BAD_REQUEST, "invalid shared path".into()));
        }
        candidate.push(part);
    }
    let root = base.canonicalize().map_err(|_| (StatusCode::NOT_FOUND, "shared root not found".into()))?;
    let resolved = candidate.canonicalize().map_err(|_| (StatusCode::NOT_FOUND, "shared entry not found".into()))?;
    if !resolved.starts_with(&root) {
        return Err((StatusCode::FORBIDDEN, "path outside shared root".into()));
    }
    Ok(resolved)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn bounds_existing_paths_to_shared_root() {
        let temp = std::env::temp_dir().join(format!("mdrop-path-test-{}", uuid::Uuid::new_v4()));
        let root = temp.join("shared");
        std::fs::create_dir_all(root.join("nested")).unwrap();
        std::fs::write(root.join("nested/movie.mp4"), b"test").unwrap();
        std::fs::write(temp.join("outside.mp4"), b"private").unwrap();
        assert!(resolve_shared_path(&root, "/nested/movie.mp4").is_ok());
        for invalid in ["../outside.mp4", "nested/../../outside.mp4", "C:\\outside.mp4", "nested\\movie.mp4"] {
            assert!(resolve_shared_path(&root, invalid).is_err());
        }
        #[cfg(unix)] {
            std::os::unix::fs::symlink(temp.join("outside.mp4"), root.join("escape.mp4")).unwrap();
            assert_eq!(resolve_shared_path(&root, "escape.mp4").unwrap_err().0, StatusCode::FORBIDDEN);
        }
        std::fs::remove_dir_all(temp).unwrap();
    }
}
