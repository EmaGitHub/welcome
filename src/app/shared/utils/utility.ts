import * as _ from 'lodash';

export class Utility {
        /*** GET UPLOADED BASE64 FILE ***/
        static getUploadedFile(event: any, callback: (ev) => void) {
            if (!event.target.files[0] || event.target.files[0].length === 0) {
                return;
            }
    
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
                
            reader.onload = (ev) => {
                callback(ev);
            };
        }

        static downloadFile(filename, base64) {
            const source = `${base64}`;
            const link = document.createElement('a');
            link.href = source;
            link.download = `${filename}`;
            link.click();
        }     

        static downloadExcel(filename, base64) {
            const source = `data:application/vnd.ms-excel;base64,${base64}`;
            const link = document.createElement('a');
            link.href = source;
            link.download = `${filename}`;
            link.click();
        }
    
        static formatText(input: string): string {
            let result = '';
            let i = 0;
          
            while (i < input.length) {
              if (input[i] === '!') {
                result += '<br>';
                i++;
              } else if (input[i] === '*' && input.indexOf('*', i + 1) !== -1) {
                const start = i + 1;
                const end = input.indexOf('*', start);
                if (end !== -1) {
                  const boldText = input.substring(start, end);
                  result += `<strong>${boldText}</strong>`;
                  i = end + 1;
                }
              } else if (input[i] === '#' && input.indexOf('#', i + 1) !== -1) {
                const start = i + 1;
                const end = input.indexOf('#', start);
                if (end !== -1) {
                  const emailText = input.substring(start, end);
                  result += `<a href="mailto:${emailText}">${emailText}</a>`;
                  i = end + 1;
                }
              } else if (input[i] === 'ɸ' && input.indexOf('ɸ', i + 1) !== -1) {
                const start = i + 1;
                const end = input.indexOf('ɸ', start);
                if (end !== -1) {
                  const hrefText = input.substring(start, end);
        
                  if (hrefText.includes("Omaggi e ospitalità") ||hrefText.includes("Regalos y hospitalidad") || hrefText.includes("Gifts and Hospitality"))
                    result += `<a href="${`https://enelcom.sharepoint.com/sites/egodrPublished/PublishedDocuments/PD_PL_299_Omaggi_ed_ospitalit%C3%A0.pdf`}" target="_blank">${hrefText}</a>`;
                  else {
                   console.log("entro in else ") ; 
                    result += `<a href="${hrefText}">${hrefText}</a>`;
                  }
                  i = end + 1;
                }
              } else {
                result += input[i];
                i++;
              }
            }
          
            return result;
          }
}
