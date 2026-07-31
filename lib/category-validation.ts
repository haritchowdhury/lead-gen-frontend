export const MAX_SHOP_TYPES = 100;

const INSTRUCTION_LIKE =
  /\b(?:ignore|disregard|override|reveal|execute|system\s+prompt|developer\s+message|assistant\s+message|follow\s+these\s+instructions|api[_ -]?key|bearer\s+token)\b/i;

export type ParsedCategories = {
  categories: string[];
  errors: string[];
};

export function parseCategories(input: string): ParsedCategories {
  const rows = input.split(/\r?\n/u);
  const categories: string[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();

  rows.forEach((row, index) => {
    const value = row.trim().replace(/\s+/gu, " ");
    if (!value) return;
    if (value.length > 80) {
      errors.push(`Line ${index + 1} is longer than 80 characters.`);
      return;
    }
    if (/[\u0000-\u001f\u007f]/u.test(value)) {
      errors.push(`Line ${index + 1} contains unsupported characters.`);
      return;
    }
    if (INSTRUCTION_LIKE.test(value) || /[<>{}`;$]/u.test(value)) {
      errors.push(`Line ${index + 1} does not look like a store category.`);
      return;
    }
    if (!/^[\p{L}\p{N} &'’()/-]+$/u.test(value)) {
      errors.push(`Line ${index + 1} contains unsupported punctuation.`);
      return;
    }

    const key = value.toLocaleLowerCase("en-US");
    if (!seen.has(key)) {
      seen.add(key);
      categories.push(value);
    }
  });

  if (categories.length > MAX_SHOP_TYPES) {
    errors.push(`Use no more than ${MAX_SHOP_TYPES} categories in one run.`);
  }
  return { categories, errors };
}

