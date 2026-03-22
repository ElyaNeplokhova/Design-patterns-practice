import { RequiredHandler } from './handlers/required-handler';
import { EmailHandler } from './handlers/email-handler';
import { MinLengthHandler } from './handlers/min-length-handler';
import { MaxLengthHandler } from './handlers/max-length-handler';

// Build the chain: required → email → minLength(8) → maxLength(64)
const required = new RequiredHandler();
const email = new EmailHandler();
const minLen = new MinLengthHandler(8);
const maxLen = new MaxLengthHandler(64);

required.setNext(email).setNext(minLen).setNext(maxLen);

const chain = required;

// Example usage
function runExample(): void {
  const testCases = [
    { field: 'email', value: '' },
    { field: 'email', value: 'invalid' },
    { field: 'email', value: 'short@x.co' },
    { field: 'email', value: 'valid.email@example.com' },
  ];

  console.log('Chain of Responsibility — Class-based validation\n');

  for (const req of testCases) {
    const result = chain.handle(req);
    console.log(`Input: "${req.value}"`);
    console.log(`  → ${result.isValid ? 'Valid' : 'Invalid'}`);
    if (!result.isValid) {
      console.log(`  → Errors: ${result.errors.join(', ')}`);
    }
    console.log();
  }
}

runExample();
