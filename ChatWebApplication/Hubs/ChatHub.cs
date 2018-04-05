using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApplication.Models;
using Microsoft.AspNet.SignalR;

namespace ChatWebApplication.Hubs
{
    public class ChatHub : Hub
    {
        static List<User> Users = new List<User>();

        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
        }

        public void Connect(string userName)
        {
            var id = Context.ConnectionId;

            if (!Users.Any(x => x.ConnectionId == id))
            {
                Users.Add(new User { ConnectionId = id, Name = userName });

                Clients.Caller.onConnected(id, userName, Users);

                Clients.AllExcept(id).onNewUserConnected(id, userName);
            }
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var user = Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (user != null)
            {
                Users.Remove(user);
                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, user.Name);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}
