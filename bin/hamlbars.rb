#!/usr/bin/env ruby

require 'tilt'
require 'hamlbars'
require 'socket'

Tilt.register Hamlbars::Template, 'hamlbars'

class Renderer
  def initialize input
    @input = input
  end

  def render
    template = Tilt['hamlbars'].new(@input) {
      @input
    }

    output = template.render(self)
    return output
  end

end

Socket.tcp_server_loop(4568) {|sock, client_addrinfo|
  Thread.new {
    begin

      sep = '$hamlbarsfileend$'
      line = ""

      while line.length == 0 do
        sock.flush
        line = sock.readline(sep).gsub(sep, "")
      end

      handlebarsOutput = Renderer.new(line).render
      sock.sync = true
      sock.write handlebarsOutput

    ensure
      sock.close
    end
  }
}
