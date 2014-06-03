<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ADNConfig360Demo.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
       <style type="text/css">
        .css1
        {
          FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#66FFFF ,endColorStr=#CCFFFF)
        }

        #ViewerAndQuato
        {
            height: 584px;
            width: 1493px;
        }
        #modelSelection
        {
            width: 85px;
        }
         #myViewer
        {            
            position: relative;
            float:left;
             width: 57%;
              height: 100%;
               top: 0px;
               left: 0px;
           }
        #QuatoDiv
        {
            border-style: dashed;
             position: relative;
              float:right;               
               height: 100%;
                width: 29%;
                 display: block;
            top: 0px;
            left: 0px;
        }
         #QuataTableDiv
        { 
             position: relative;
              float:left;               
               height: 90%;
                width: 100%; 
        }
         #Sel_Update_Div
        {           
            position: relative;
            float:left;               
               height: 10%;
                width: 49%; 
            top: 0px;
            left: 0px;
        }
         #Send_Div
        {
            position: relative;
            float:right;               
               height: 10%;
                width: 49%; 
           
        }
          #tbMaterial
        {            
            width:80%;
        }
        #splitDiv
        {
            height: 38px;
        }
        #UpdateQuato
        {
            width: 109px;
        }

         #SetPdiv
        {
           position: relative;
            float:left;
             width: 13%;
              height: 100%;
               top: 0px;
             display: block;
              border-style: dashed;
               left: 0px;
           }
      
           #GetProp {
               width: 89px;
           }
           #SetProp {
               width: 88px;
           }
           .auto-style1 {
               width: 45px;
           }
      
    </style>
</head>
<body>
      <form id="form1" runat="server" class="css1">
    <h1>DevTech Test Configuration 360</h1>
     <div id="ViewerAndQuato">         
          <div id="myViewer"> 
          
          </div>

          <div id="SetPdiv"> 
              <input id="GetProp" type="button" value="Get Property" /> 
              <input id="SetProp" type="button" value="Set Property" /><br />
              &nbsp;<br />
              <table class="ConfigProTB" id="ConfigProTB">
              <thead>
                  <tr>
                      <td class="auto-style1">name</td>
                      <td>value</td>           
                  </tr>
              </thead>
              <tbody><tr></tr></tbody>
            </table>
          </div>
         
           <div id="QuatoDiv">
                   <div id="Sel_Update_Div">
                        <select id="modelSelection" name="modelSelection">                          
                          <option>SimpleTest</option>
                            <option>Tuner</option>
                        </select>&nbsp; 
                       <input id="UpdateQuato" type="button" value="Update Cost" /> <br />
                   </div> <%--Sel_Update_Div--%>

                   <div id="Send_Div">                   
                       <asp:ScriptManager ID="ScriptManager1" runat="server">
                           <scripts>
                                <asp:scriptreference path="~/javascript/WebKit.js">
                                </asp:scriptreference>
                            </scripts>
                       </asp:ScriptManager>
                       <asp:UpdatePanel ID="UpdatePanel1" runat="server" updatemode="Conditional" >
                       <ContentTemplate>
                             <asp:Button ID="BtnSendEmail" runat="server" onclick="BtnSendEmail_Click" 
                           Text="Send Cost" Width="100px" />
                             <br />
                        </ContentTemplate>
                       </asp:UpdatePanel> 
                  </div> <%--Send_Div--%>

                 <div id="QuataTableDiv">
                   <p></p>
                   <p id="TotalCostText">
                     There is no any quato. Click Update Cost
                   </p>
                   
                   <table id="QuatoTable" border="true" frame="box" style="width:100%;">
                    <thead>
                    <tr>
                        <td style="font-weight: bold">
                            Component</td>
                        <td style="font-weight: bold">
                            Material</td>
                        <td style="font-weight: bold">
                            Volumn</td>
                        <td style="font-weight: bold">
                            Cost</td>                   
                    </tr>
                     </thead>
                     <tbody> 
                    </tbody>  
                  </table>
                </div>  <%--QuataTableDiv--%>
           </div>   <%--QuatoDiv--%>
    </div>  <%--ViewerAndQuato--%>
    
     
     <div id="splitDiv">
     <p>Materials Price from LXD Web Services</p>
     </div>

    <div id="material" > 
    <table id="tbMaterial"   class="table"  frame="border">
        <thead>
            <tr>
            <th>material</th>
            <th>price</th>      
            </tr>
         </thead>
         <tbody> 
        </tbody>  
    </table>
   </div>     
   </form>
</body>

<script type='text/javascript' src='Scripts\jquery-1.9.1.min.js'></script>
<script type='text/javascript' src='Scripts\jquery.scrollTo.js'></script>
<script type='text/javascript' src='Scripts\jquery.toc.min.js'></script>
<script type='text/javascript' src='Scripts\jquery.sharrre-1.2.0.min.js'></script>
<link rel="stylesheet" media="all" href="Scripts\jquery.dynatable.css" />    
<script type='text/javascript' src='Scripts\jquery.dynatable.js'></script>

<script type="text/javascript" src="https://configurator360.autodesk.com/Script/EmbeddedViewer"></script>
<script type="text/javascript" src = "Scripts\DTable.js"></script>
<script type="text/javascript" src = "Scripts\ConfigVewier.js"></script>

</html>
