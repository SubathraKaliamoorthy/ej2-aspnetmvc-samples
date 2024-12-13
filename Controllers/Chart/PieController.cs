#region Copyright Syncfusion Inc. 2001-2024.
// Copyright Syncfusion Inc. 2001-2024. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Syncfusion.EJ2.Charts;

namespace EJ2MVCSampleBrowser.Controllers.Chart
{
    public partial class ChartController : Controller
    {
        // GET: Pie
        public ActionResult Pie()
        {
            List<PieChartData> ChartPoints = new List<PieChartData>
            {
                new PieChartData { Browser= "Chrome",            Users= 59.28, DataLabelMappingName= "Chrome: 59.28%" },
                new PieChartData { Browser= "UC Browser",        Users= 4.37,  DataLabelMappingName= "UC Browser: 4.37%" },
                new PieChartData { Browser= "Internet Explorer", Users= 6.12,  DataLabelMappingName= "Internet Explorer: 6.12%" },                
                new PieChartData { Browser= "Sogou Explorer",    Users= 1.73,  DataLabelMappingName= "Sogou Explorer: 1.73%" },
                new PieChartData { Browser= "QQ",                Users= 3.96,  DataLabelMappingName= "QQ: 3.96%" },
                new PieChartData { Browser= "Safari",            Users= 4.73,  DataLabelMappingName= "Safari: 4.73%" },
                new PieChartData { Browser= "Opera",             Users= 3.12,  DataLabelMappingName= "Opera: 3.12%" },            
                new PieChartData { Browser= "Edge",              Users= 7.48,  DataLabelMappingName= "Edge: 7.48%" },
                new PieChartData { Browser= "Others",            Users= 9.57,  DataLabelMappingName= "Others: 9.57%" }
            };
            bool isMobile = Request.Browser.IsMobileDevice;
            if (isMobile)
            {
                ChartPoints.RemoveRange(1, 4);
                ChartPoints[4].Users = 25.39;
                ChartPoints[1].DataLabelMappingName = "Safari <br> 4.73%";
                ChartPoints[4].DataLabelMappingName = "Others: 25.39%";
            };
            ViewBag.ChartPoints = ChartPoints;
            return View();
        }
        public class PieChartData
        {
            public string Browser;
            public double Users;
            public string DataLabelMappingName;
        }
    }
}