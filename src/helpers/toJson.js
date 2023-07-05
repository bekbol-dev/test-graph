export function toJson(data){
  return data.toJSON().split('T')[0]
}