# Project sync (Gitea + file mirror)

**Warning:** `ferozarshad.com-full` holds secrets (including `.env`) and must never get a GitHub remote.

Repos: `ferozarshad.com` (code) and `ferozarshad.com-full` (replica). Remotes: `origin` = GitHub, `gitea` = Gitea. Do not rename either.

## Start of session

```powershell
git pull gitea main
```

## Push code

```powershell
git push gitea
git push origin
```

## Push replica (owner only)

```powershell
git --git-dir=.fullgit --work-tree=. add -A -f -- . ":(exclude).git" ":(exclude).fullgit" ":(exclude)node_modules" ":(exclude).next" ":(exclude)dist" ":(exclude)build" ":(exclude).venv" ":(exclude)venv" ":(exclude)__pycache__" ":(exclude)target" ":(exclude)vendor"
git --git-dir=.fullgit --work-tree=. commit -m "<msg>"
git --git-dir=.fullgit --work-tree=. push
```

## Refresh file mirror

```powershell
robocopy "D:\ferozarshad.com" "Z:\projects\ferozarshad.com" /MIR /R:1 /W:1 /MT:16 /XD node_modules .next dist build .venv venv __pycache__ target vendor .git .fullgit /XF *.log *.tmp
```

Mirror is one-way (local → shared drive). Files written only on the server side are deleted on the next run.
