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
      File.read(@input)
    }

    output = template.render(self)
    # puts output
    return output
  end

end

# puts "**" * 100
# puts "started hamlbars server"
# puts "**" * 100

Socket.tcp_server_loop(4568) {|sock, client_addrinfo|
  Thread.new {
    begin

      sock.puts "hola"
      sock.write "hola"

      lines = []
      while lines.length == 0 do
        # puts "reading lines"
        lines += sock.readlines('/hamlbarsfileend/')
      end

      # puts lines.length
      # puts lines[0]
      # IO.foreach(sock) {|x| print "GOT ", x }
      # IO.copy_stream(sock, sock)
    # ensure
      sock.puts("closing socket server side")
      sock.close
    end
  }
}

# loop {
#   Thread.start(server.accept) do |client|
#     client.read do |data|
#       puts data
#     end
#     while line = client.gets
#       puts line
#     end
#     # puts "Received something"
#     # renderer = Renderer.new
#     # client.puts renderer.render
#   end
# }
