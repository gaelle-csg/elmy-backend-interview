import promptSync from 'prompt-sync';
import { isMatch, parseISO, format } from 'date-fns';

export const dateFormat: string = 'dd-MM-yyyy';
const prompt = promptSync();

class InputReader {
  
  static readDate(questionText: string) {
    let date = prompt(questionText);
    if (date !== null && isMatch(date, dateFormat)) {
        return format(parseISO(date), dateFormat);
    } else {
      console.log(`${date} does not match format ${dateFormat}`);
      return undefined;
    }
  }

}

export default InputReader;