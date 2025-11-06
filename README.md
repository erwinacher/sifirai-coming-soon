# sifirai coming soon

### Guidelines

- Everything is **Rust-first**, unified under `cargo make`
- One entrypoint for CI/CD
- Portable to Linux/macOS/Windows
- Extendable later for:
  - wasm builds
  - docker packaging
  - test pipelines
  - env setup, `.env` loading, etc.

### Dev workflow

```bash
cargo make dev
```

### Build + run production

```bash
cargo make run
```

### Commands

| Action           | Command                  | Description                            |
| ---------------- | ------------------------ | -------------------------------------- |
| Clean all        | `cargo make clean`       | clears Rust target and build artifacts |
| Build frontend   | `cargo make web-build`   | builds Vite -> `web/dist`              |
| Run backend only | `cargo make backend-run` | starts Axum server                     |
| Full workflow    | `cargo make run`         | builds web then runs backend           |
| Dev mode         | `cargo make dev`         | runs Vite live server + watches Rust   |
