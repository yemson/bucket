export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log(body)

  if (body.type === 1) {
    return {
      test: 'hi',
    }
  }
  else {
    throw createError({
      statusMessage: 'Error',
      statusCode: 400,
    })
  }
})
