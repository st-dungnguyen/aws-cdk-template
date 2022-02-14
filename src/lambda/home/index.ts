exports.handler = async function (event: any) {
  return {
    statusCode: 200,
    body: JSON.stringify({success: true})
  }
}
