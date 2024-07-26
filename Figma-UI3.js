// Quantumult X script for modifying response body of specific URLs
// if ($request.url) {
//   console.log('Request URL:' + $request.url + ' 123')
// } else {
//   console.log('Request Obj: ' + JSON.stringify($request) + ' 123')
// }
// Check if the current request URL matches the desired pattern
if (
  $request.url.includes('figma_app-') &&
  $request.url.includes('.min.js.br') &&
  !$request.url.includes('runtime~figma_app')
) {
  console.log('Figma: URL matches pattern 🎊')

  const url = $request.url

  $task.fetch({ url }).then(
    response => {
      console.log(response.statusCode, response.headers)
      // response.statusCode, response.headers, response.body
      let body = response.body

      body = body.replace(/e\?"ui3":"ui2"/g, '"ui3"')
      body = body.replace(/c\(e\)?"ui3":"ui2"/g, '"ui3"')
      body = body.replace(/version:"ui2",/g, 'version:"ui3",')
      body = body.replace(
        /initialVersion:a="ui2"}\)/g,
        'initialVersion:a="ui3"})'
      )
      body = body.replace(/"ui2"===o.version/g, 'false')

      console.log('Content modified')

      // Return the modified body
      $done({
        status: response.statusCode,
        body: body
      })
    },
    reason => {
      // reason.error
      $notify('Title', 'Subtitle', reason.error) // Error!
      $done({})
    }
  )
} else {
  console.log('URL does not match pattern')
  // If the URL does not match, return the original response body
  $done({})
}
