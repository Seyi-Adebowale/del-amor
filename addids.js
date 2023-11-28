const fs = require('fs');

const fileName = 'data.json'; // Replace with your actual file name

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const parsedData = JSON.parse(data);

    // Iterate over categories
    for (const categoryKey in parsedData) {
      if (parsedData.hasOwnProperty(categoryKey)) {
        const category = parsedData[categoryKey];

        // Iterate over occasions within each category
        for (const occasionKey in category) {
          if (category.hasOwnProperty(occasionKey)) {
            const occasion = category[occasionKey];

            // Ensure it's an array
            if (Array.isArray(occasion)) {
              // Iterate over items within each occasion
              occasion.forEach((item) => {
                // Check if the item has an 'id' property
                if ('id' in item) {
                  // Check if 'id' is not already the first property
                  if (Object.keys(item)[0] !== 'id') {
                    // Rearrange properties to put 'id' first without removing it
                    const idValue = item.id;
                    delete item.id;
                    item = { id: idValue, ...item };
                  }
                }
              });
            }
          }
        }
      }
    }

    // Update the file with the modified data
    fs.writeFile(fileName, JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
        console.log('Properties rearranged successfully.');
      }
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
