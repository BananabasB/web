export interface LanguageInfo {
  name: string;
  file_extension: string;
  abbreviation: string[];
}

export const languages: Record<string, LanguageInfo> = {
  "typescript": {
    "name": "TypeScript",
    "file_extension": ".ts",
    "abbreviation": ["ts", "typescript"]
  },
  "javascript": {
    "name": "JavaScript",
    "file_extension": ".js",
    "abbreviation": ["js", "javascript"]
  },
  "python": {
    "name": "Python",
    "file_extension": ".py",
    "abbreviation": ["py", "python"]
  },
  "java": {
    "name": "Java",
    "file_extension": ".java",
    "abbreviation": ["java"]
  },
  "bash": {
    "name": "Bash",
    "file_extension": ".sh",
    "abbreviation": ["bash", "sh"]
  },
  "fish": {
    "name": "Fish",
    "file_extension": ".fish",
    "abbreviation": ["fish"]
  },
  "markdown": {
    "name": "Markdown",
    "file_extension": ".md",
    "abbreviation": ["md", "markdown"]
  },
  "rust": {
    "name": "Rust",
    "file_extension": ".rs",
    "abbreviation": ["rs", "rust"]
  },
  "ruby": {
    "name": "Ruby",
    "file_extension": ".rb",
    "abbreviation": ["rb", "ruby"]
  },
  "tsx": {
    "name": "TypeScript (React)",
    "file_extension": ".tsx",
    "abbreviation": ["tsx", "typescript react"]
  }
}
