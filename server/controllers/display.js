'use strict';

exports.index = {
  handler: function (request, reply) {
    reply.view('index', {
      title: 'Marius de Beer' //,
    });
  }
};

exports.notes = {
  handler: function (request, reply) {
    reply.view('notes', {
      socketId: request.params.socketId,
      layout: ''
    });
  }
};

