/**
 * This function will take the checkbox ids and the previous state array and
 * return it to the new array.
 *
 * @param {number} checkboxId - The current checkbox id.
 * @param {number[]} previousState - The previous state of checkbox ids.
 * @returns {number[]} - Returns the new state of checkbox ids.
 */
export const handleToggle = (checkboxId, previousState) => {
  //extract the idx of the array based on inputed checkbox idx
  const currentIndex = previousState.indexOf(checkboxId);
  //This basically sets the currentIndex to the index of the checkboxId
  //i.e previousState = [0, 1, 2, 3, 4, 5]   checkboxId = 2; currentIndex = 2
  let newCheckedArray = [...previousState];

  if (currentIndex === -1) {
    //this means that nothing is selected
    if (checkboxId === 0) {
      newCheckedArray = [];
    } else {
      const filtered = newCheckedArray.filter((item) => item !== 0);
      newCheckedArray = [...filtered];
    }
    newCheckedArray.push(checkboxId);
  } else {
    newCheckedArray.splice(currentIndex, 1);
  }
  return newCheckedArray.sort((a, b) => a - b);
};
