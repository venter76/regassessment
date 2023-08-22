const MIN_VALUE = 3;
const MAX_VALUE = 4;

function analyzeScores(staffData) {
    return staffData.reduce((acc, doc) => {
        doc.scores.forEach(score => {
            const actualScore = score._doc;
            
            for (let [key, value] of Object.entries(actualScore)) {
                if (typeof value === 'number' && value !== 0 && /Score\d+$/.test(key)) { // Added value !== 0 condition here
                    if (value < MIN_VALUE) {
                        acc[key] = acc[key] || { below: 0, above: 0 };
                        acc[key].below++;
                    } else if (value > MAX_VALUE) {
                        acc[key] = acc[key] || { below: 0, above: 0 };
                        acc[key].above++;
                    }
                }
            }
        });

        return acc;
    }, {});
}

module.exports = { analyzeScores };









// const MIN_VALUE = 3;
// const MAX_VALUE = 4;

// function analyzeScores(staffData) {
//     return staffData.reduce((acc, doc) => {
//         doc.scores.forEach(score => {
//             const actualScore = score._doc;
            
//             for (let [key, value] of Object.entries(actualScore)) {
//                 if (typeof value === 'number' && /Score\d+$/.test(key)) {
//                     if (value < MIN_VALUE) {
//                         acc[key] = acc[key] || { below: 0, above: 0 };
//                         acc[key].below++;
//                     } else if (value > MAX_VALUE) {
//                         acc[key] = acc[key] || { below: 0, above: 0 };
//                         acc[key].above++;
//                     }
//                 }
//             }
//         });

//         return acc;
//     }, {});
// }

// module.exports = { analyzeScores };



// const MIN_VALUE = 3;
// const MAX_VALUE = 7;

// function analyzeScores(staffData) {
//     return staffData.reduce((acc, doc) => {
//         doc.scores.forEach(score => {
//             const actualScore = score._doc;
            
//             for (let [key, value] of Object.entries(actualScore)) {
//                 if (typeof value === 'number' && /Score\d+$/.test(key) && (value < MIN_VALUE || value > MAX_VALUE)) {
//                     acc[key] = (acc[key] || 0) + 1;
//                 }
//             }
//         });

//         return acc;
//     }, {});
// }

// module.exports = { analyzeScores };




// function analyzeScores(staffData) {
//     const scoreResults = {};

//     console.log('Starting the analysis...'); // Debugging message
//     console.log('Input staffData:', JSON.stringify(staffData, null, 2));

//     staffData.forEach(doc => {
//       // Extract individual scores from score schema
//       const scores = doc.scores;
  
//       scores.forEach(score => {
//           const actualScore = score._doc;  // Use the _doc property for the actual data
//           for (let [key, value] of Object.entries(actualScore)) {
//             if (typeof value === 'number') {
//                 console.log(`${key} is a number`);
//                 if (key.endsWith('Score')) {
//                     console.log(`${key} ends with 'Score'`);
//                     if (value < 4 || value > 7) {
//                         console.log(`Adding to scoreResults for key: ${key}, value: ${value}`);
//                         if (scoreResults[key]) {
//                             scoreResults[key]++;
//                         } else {
//                             scoreResults[key] = 1;
//                         }
//                     }
//                 }
//             }
//         }
        
//       });
//   });
  
//   console.log('Analysis complete:', scoreResults);
  
  
   
  
//     return scoreResults;
//   }

//   module.exports = { analyzeScores };