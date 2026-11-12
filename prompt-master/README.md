# Prompt Master

A Claude Code mod that upgrades rough prompts in one click. Type a rough prompt, press **✨ Prompt Master** above the prompt box (or run `/prompt-master <your prompt>`), answer up to 3 quick questions, and get back a rewritten prompt built on a proven framework (RTF, CO-STAR, RISEN, or chain-of-thought with examples), ready to copy. It never runs the task itself and never invents facts: anything unknown becomes a `[PLACEHOLDER]`.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install prompt-master --marketplace lpusapati333/narasimha-raju-pusapati-repo
```

Answer `y` to add the marketplace, then press Enter to install for your user. It is active right away and in every new session.

From a shell:

```bash
claude plugin install prompt-master --marketplace lpusapati333/narasimha-raju-pusapati-repo
```

In the Claude desktop app: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `lpusapati333/narasimha-raju-pusapati-repo`, then **Add plugin**.

## Use

- **Button:** type a rough prompt, then press **✨ Prompt Master**.
- **Command:** `/prompt-master write a LinkedIn post about my AI project`
- **Customise:** edit the `metaPrompt` text in `hooks/register.tsx`.

## Safety

It adds one button and one slash command. It reads no files, makes no network calls, and needs no keys or passwords.
