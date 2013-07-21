var app = require('derby').createApp(module)

app
  .use(require('derby-ui-boot'))
  .use(require('../../ui'))

app.get('/', function(page, model, params, next) {
  var data = model.at('widgets.data')
  data.subscribe(function(err) {
    if (err) return next(err)
    data.setNull('numbers', [
      {text: 'First'}
    , {text: 'Second'}
    , {text: 'Third'}
    ])
    data.setNull('colors', [
      {text: 'Red'}
    , {text: 'Orange'}
    , {text: 'Purple'}
    ])
    data.setNull('color', 'Purple')
    page.render('home')
  })
})

app.get('/another-page', function(page, model, params, next) {
    page.render('another')
})

// The "init" and "create" events may be used to get access to
// a component instance's script object
app.createModal = function(modal) {
  app.showModal = function() {
    modal.show();
  }
  // Custom event emitters may be added on the component itself
  modal.on('close', function(action, cancel) {
    console.log('Action: ' + action)
  })
}

// They may also be bound via a template
app.closeModal = function(action, cancel) {
  if (!window.confirm('Action: ' + action + '\n\nContinue to close?')) {
    cancel()
  }
}
