import AsyncStorage from "@react-native-async-storage/async-storage"
const _store_data = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key, JSON.stringify(value)
        )
    } catch (error) {
    }
}

const _retrieve_data = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null){
            return JSON.parse(value)
        }else{
            return null
        }
    }catch(error) {
    }
} 

const _remove_data = async (key) => {
    try {
      await AsyncStorage.removeItem(key); // Menghapus item dengan key tertentu dari penyimpanan
      return true
    } catch (error) {
      return false
    }
  }

  const _get_all_keys_data = async () => {
    try {
      const value = await AsyncStorage.getAllKeys(); // Menghapus item dengan key tertentu dari penyimpanan
      return value
    } catch (error) {
      return false
    }
  }

export {_store_data, _retrieve_data, _remove_data, _get_all_keys_data}