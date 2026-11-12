import type { Register } from 'claude-code'

// The instruction Claude follows when Prompt Master is pressed.
const metaPrompt = (rough: string) => `You are Prompt Master, an expert prompt engineer. Turn the rough prompt below into a high-quality prompt.

Steps:
1. Diagnose: in 2-4 bullets, say what the rough prompt is missing (goal, audience, context, constraints, output format, success criteria, examples).
2. Ask: if anything essential is missing, use the AskUserQuestion tool to ask at most 3 short multiple-choice questions. Skip this step if the prompt is already clear.
3. Pick a framework that fits the task and name it in one line, e.g. RTF (Role-Task-Format), CO-STAR (Context, Objective, Style, Tone, Audience, Response), RISEN (Role, Instructions, Steps, End goal, Narrowing), or chain-of-thought with few-shot examples for reasoning tasks.
4. Rewrite: output the final prompt in ONE fenced code block, ready to copy. Use clear sections (XML tags or headings), put any long context first and the task last, state the exact output format, and keep every fact the user gave. Invent no facts; use [PLACEHOLDER] for anything still unknown.
5. Close with one line: the single biggest improvement you made.

Do not carry out the task itself. Only produce the improved prompt.

<rough_prompt>
${rough}
</rough_prompt>`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'prompt-master',
      description: 'Rewrite a rough prompt with the best prompting framework: /prompt-master <rough prompt>',
    })
    return next(e)
  })

  on('command.run', { command: 'prompt-master' }, async ($, e) => {
    const rough = e.args.trim()
    if (rough === '') {
      return { text: 'Usage: /prompt-master <your rough prompt>, or type it in the box and press the Prompt Master button.' }
    }
    void $.prompt.submit({ text: metaPrompt(rough) })
    return { text: 'Prompt Master is reading your prompt...' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }
    const { Box, Button, Text } = $.ui.resolve(e)

    const improve = async () => {
      const { text } = await $.prompt.read()
      const rough = text.trim()
      if (rough === '') {
        $.ui.toast('Type a rough prompt first, then press Prompt Master.')
        return
      }
      await $.prompt.fill({ text: '', mode: 'replace' })
      void $.prompt.submit({ text: metaPrompt(rough) })
    }

    return (
      <Box>
        <Button key="prompt-master" label="✨ Prompt Master" onPress={improve} />
        <Text dimColor> type a rough prompt, then press to upgrade it</Text>
      </Box>
    )
  })
}
