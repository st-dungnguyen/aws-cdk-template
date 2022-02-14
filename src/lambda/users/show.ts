exports.handler = async function (event: any) {
  return {
    statusCode: 200,
    body: JSON.stringify({success: true, message: 'This is 1 user by id', event: event})
  }
}
