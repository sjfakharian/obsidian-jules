# Third-party notices

This project includes adapted upstream material. Attribution belongs to the original authors as well as the authors of subsequent changes. The project name and root license must not be read as a claim that all bundled source was created here.

## Obsidian Mind

Source: https://github.com/breferrari/obsidian-mind

The vault hook/helper foundation and related conventions include adapted Obsidian Mind code. A source comparison during the 2026-10-07 review confirmed shared implementation in `.claude/scripts/lib/atomic-write.ts`, and the local package and manual retain `obsidian-mind` references. This notice does not claim that this checkout tracks the latest upstream version or that every local file is identical to upstream.

Upstream license: https://github.com/breferrari/obsidian-mind/blob/main/LICENSE

```text
MIT License

Copyright (c) 2026 Brenno Ferrari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Obsidian Skills

Source: https://github.com/kepano/obsidian-skills

`.claude/update-skills.ts` identifies this repository as the source of bundled Obsidian skills. Preserve upstream licensing when copying or updating those skills. Other skill directories are not automatically covered by this notice merely because they share the same parent directory.

Upstream license: https://github.com/kepano/obsidian-skills/blob/main/LICENSE

```text
MIT License

Copyright (c) 2026 Steph Ango (@kepano)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Other components and services

Keep any component-specific notices shipped with other skills or dependencies. A full vendored-component inventory and historical source mapping have not been completed by this review; do not describe this file as a complete license audit or SBOM.

Obsidian, Claude Code, Google Jules, QMD, and GitHub are independently maintained products/projects. Their names describe interoperability or source attribution, not sponsorship or endorsement. Their service terms and access requirements are separate from this repository's MIT license.
