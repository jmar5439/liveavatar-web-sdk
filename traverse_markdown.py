import os
import subprocess
from datetime import datetime
from tqdm import tqdm

# === EXCLUDE BY NAME (anywhere) ===
EXCLUDED_NAMES = {
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    '.angular',
    '.github',
    "storage",
    "__pycache__",
    ".svelte-kit"
    "venv",
    ".venv"
}

# === EXCLUDE BY FULL RELATIVE PATH ===
EXCLUDED_PATHS = {
    "frontend/.svelte-kit",
}

EXCLUDED_FILES = {
    "package-lock.json",
    "package.json",
    "repo_files.md",
    "repo_files.json",
    "README.md",
    "NEON.md",
    "DATABASE.md",
    "AGENT.md",
    "latest.dump",
    "traverse_markdown.py",
    "heroku_db.dump",
    "traverse.py"
}


def should_exclude_dir(rel_dir):
    """Return True if directory should be skipped."""
    rel_dir = rel_dir.replace("\\", "/").rstrip("/")

    # 1. Exclude by full path
    if rel_dir in EXCLUDED_PATHS:
        return True
    if any(rel_dir.startswith(p + "/") for p in EXCLUDED_PATHS):
        return True

    # 2. Exclude by name (anywhere)
    basename = os.path.basename(rel_dir)
    if basename in EXCLUDED_NAMES:
        return True

    return False


def traverse_repo_markdown(repo_path=".", output_file="repo_files.md", max_file_size=2*1024*1024):
    repo_path = os.path.abspath(repo_path)
    md_sections = []
    all_files = []

    print(f"Traversing: {repo_path}\n")

    for root, dirs, files in os.walk(repo_path):
        rel_root = os.path.relpath(root, repo_path).replace("\\", "/")
        if rel_root == ".":
            rel_root = ""

        # === FILTER DIRECTORIES ===
        filtered_dirs = []
        for d in dirs:
            rel_dir = os.path.join(rel_root, d).replace("\\", "/")
            if should_exclude_dir(rel_dir):
                tqdm.write(f"Excluded directory: {rel_dir}/")
            else:
                filtered_dirs.append(d)
        dirs[:] = filtered_dirs

        # === COLLECT FILES ===
        for file in files:
            if file.lower() in {f.lower() for f in EXCLUDED_FILES}:
                continue
            file_path = os.path.join(root, file)
            all_files.append(file_path)

    # === PROCESS FILES ===
    for file_path in tqdm(all_files, desc="Processing files", unit="file"):
        rel_path = os.path.relpath(file_path, repo_path).replace("\\", "/")

        try:
            size_bytes = os.path.getsize(file_path)
            last_modified = datetime.fromtimestamp(os.path.getmtime(file_path)).isoformat()
            commit_hash, author, date = get_git_metadata(rel_path)

            md = [f"## `{rel_path}`\n"]

            #md += [
            #    "| Field | Value |",
            #    "|-------|-------|",
            #    f"| Size | {size_bytes} bytes |",
            #    f"| Last Modified | {last_modified} |",
            #    f"| Git Commit | `{commit_hash or 'N/A'}` |",
            #    f"| Git Author | {author or 'N/A'} |",
            #    f"| Git Date | {date or 'N/A'} |\n",
            #]

            if size_bytes <= max_file_size and is_text_file(file_path):
                try:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                    lang = guess_language(file_path)
                    md.append(f"### Content\n```{lang}\n{content}\n```")
                except Exception as e:
                    md.append(f"### Content\n```\n<< Read error: {e} >>\n```")
            else:
                reason = "too large" if size_bytes > max_file_size else "binary"
                md.append(f"### Content\n```\n<< Skipped: {reason} >>\n```")

            md_sections.append("\n".join(md))

        except Exception as e:
            tqdm.write(f"Error: {rel_path} → {e}")

    # === WRITE OUTPUT ===
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("# Repository File Report\n\n")
        f.write(f"*Generated: {datetime.now().isoformat()}*\n\n")
        f.write("\n\n---\n\n".join(md_sections))

    print(f"\nReport saved: {output_file}")
    print(f"Files processed: {len(all_files)}")


# === Reuse your helper functions ===
def get_git_metadata(file_path):
    try:
        result = subprocess.check_output(
            ["git", "log", "-1", "--pretty=format:%H|%an|%ad", "--", file_path],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        if result:
            return result.split("|", 2)
    except:
        pass
    return None, None, None


def is_text_file(file_path, blocksize=512):
    try:
        with open(file_path, "rb") as f:
            chunk = f.read(blocksize)
            if not chunk: return True
            chunk.decode("utf-8", errors="ignore")
            return True
    except:
        return False


def guess_language(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    mapping = {
        ".py": "python", ".js": "javascript", ".ts": "typescript",
        ".html": "html", ".css": "css", ".json": "json", ".md": "markdown",
        ".yml": "yaml", ".yaml": "yaml", ".sh": "bash", ".svelte": "svelte",
        ".jsx": "javascript", ".tsx": "typescript",
    }
    return mapping.get(ext, "")


if __name__ == "__main__":
    traverse_repo_markdown()