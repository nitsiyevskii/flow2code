import  AsyncStorage  from '@react-native-community/async-storage'

export function getCache(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res) => {
        let val = JSON.parse(res)
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      })
  })

}

export function setCache(key, value) {
  return new Promise((resolve, reject) => {
    let val = JSON.stringify(value);
    AsyncStorage.setItem(key, val)
      .then((res) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export function clearCache() {
    AsyncStorage.clear()
}