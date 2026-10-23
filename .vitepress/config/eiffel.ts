// Shiki ships no Eiffel grammar, so the Design by Contract sample would fall back to plain text.
// A small TextMate grammar covering comments, strings, numbers, keywords and CLASS_NAMES is enough here.
export const eiffel = {
  name: 'eiffel',
  scopeName: 'source.eiffel',
  patterns: [
    { name: 'comment.line.double-dash.eiffel', match: '--.*$' },
    {
      name: 'string.quoted.double.eiffel',
      begin: '"',
      end: '"',
      patterns: [{ name: 'constant.character.escape.eiffel', match: '%.' }]
    },
    { name: 'string.quoted.single.eiffel', match: "'(?:%.|[^'])'" },
    { name: 'constant.numeric.eiffel', match: '\\b\\d+(?:\\.\\d+)?\\b' },
    {
      name: 'keyword.control.eiffel',
      match: '(?i)\\b(?:if|then|elseif|else|end|from|until|loop|inspect|when|do|once|require|ensure|invariant|variant|check|rescue|retry|debug|deferred|external|attribute)\\b'
    },
    {
      name: 'storage.type.eiffel',
      match: '(?i)\\b(?:class|feature|inherit|create|redefine|rename|undefine|select|export|frozen|expanded|local|is|convert|note|indexing|agent|like|old|alias|obsolete)\\b'
    },
    { name: 'constant.language.eiffel', match: '(?i)\\b(?:True|False|Void|Current|Result|Precursor)\\b' },
    { name: 'keyword.operator.word.eiffel', match: '(?i)\\b(?:and|or|xor|not|implies)\\b' },
    { name: 'entity.name.type.eiffel', match: '\\b[A-Z][A-Z0-9_]*\\b' },
    { name: 'keyword.operator.eiffel', match: ':=|/=|<=|>=|[=<>+\\-*/^]' }
  ]
}
