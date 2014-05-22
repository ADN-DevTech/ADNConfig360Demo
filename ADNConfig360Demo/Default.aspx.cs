using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ADNConfig360Demo
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public static string htmlName;
        public static string divContent;
        [System.Web.Services.WebMethod]
        public static string HelloWorld(string name, string div)
        {
            htmlName = name;
            divContent = div; 

            return "Hello World";
        }

        protected void BtnSendEmail_Click(object sender, EventArgs e)
        {
            using (StreamWriter sw = new StreamWriter(Server.MapPath(htmlName)))
            using (HtmlTextWriter writer = new HtmlTextWriter(sw))
            {
                writer.RenderBeginTag(HtmlTextWriterTag.Html);

                writer.RenderBeginTag(HtmlTextWriterTag.Head);
                writer.Write("");
                writer.RenderEndTag();

                writer.RenderBeginTag(HtmlTextWriterTag.Body);
                writer.Write(divContent);
                writer.RenderEndTag();

                writer.RenderEndTag();
            }
            string line1 = "var hh = \"http://lxdtestconfig360.azurewebsites.net/" + htmlName + "\";";
            string line2 = "var body = escape(\"Hi, \" + String.fromCharCode(13) + \"This is the Cost Report:\" + String.fromCharCode(13) + hh);";
            string line3 = "var subject = \"DevTech Configurator 360 Cost Report - Tuner\";";
            string line4 = "window.location.href = \"mailto:?body=\" + body + \"&subject=\" + subject;";


            System.Text.StringBuilder cstext2 = new System.Text.StringBuilder();
            cstext2.Append("<script type=\"text/javascript\"> ");

            cstext2.Append(line1);
            cstext2.Append(line2);
            cstext2.Append(line3);
            cstext2.Append(line4);
            cstext2.Append("</script>");

            ClientScriptManager cs = Page.ClientScript;
            Type cstype = this.GetType();
            ScriptManager.RegisterStartupScript(this, this.GetType(), "sendMyEmail", cstext2.ToString(), false);
            
        }
    }
}