const getter = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result.key);
    });
  });
};

const setter = (key: string, value: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ key: value }, () => {
      resolve();
    });
  });
};
