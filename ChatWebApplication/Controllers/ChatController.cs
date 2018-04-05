using System.Web.Mvc;

namespace ChatWebApplication.Controllers
{
    public class ChatController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
