export const capitalizeFirstLetter = (string) => {
    if (!string) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFileExtensions = (str) => str.slice(((str.lastIndexOf('.') - 1) >>> 0) + 2);

/**
 * 判斷後綴自是否相符
 * @param {Array} arr
 * @param {String} target
 * @returns {Boolean}
 */
export const extractIsExistExtensions = (arr, target) => Array.from(arr).includes(target);

export const getFileName = (str) => str.slice(0, str.lastIndexOf('.'));
