import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameRemover'
})
export class OTNameRemoverPipe implements PipeTransform {

    transform(usernames: string, namesToRemove: string[]): string {
        if (!usernames || !namesToRemove || namesToRemove.length === 0) {
          return usernames;
        }
    
        const usernameArray = usernames.split(',').map(name => name.trim());
        const filteredNames = usernameArray.filter(name => !namesToRemove.includes(name));
    
        return filteredNames.join(', ');
      }

}
