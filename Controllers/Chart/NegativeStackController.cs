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
        // GET: NegativeStack
        public ActionResult NegativeStack()
        {
            List<NegativeStackChartData> ChartPoints = new List<NegativeStackChartData>
            {
                new NegativeStackChartData { Height = "4.5", Female = 31, Male = -31, Text = "31 KG", Female_Text = "31 KG" },
                new NegativeStackChartData { Height = "4.8", Female = 37, Male = -39, Text = "39 KG", Female_Text = "37 KG" },
                new NegativeStackChartData { Height = "5.1", Female = 49, Male = -52, Text = "52 KG", Female_Text = "49 KG" },
                new NegativeStackChartData { Height = "5.4", Female = 57, Male = -64, Text = "64 KG", Female_Text = "57 KG" },
                new NegativeStackChartData { Height = "5.7", Female = 63, Male = -70, Text = "70 KG", Female_Text = "63 KG" },
                new NegativeStackChartData { Height = "6", Female = 69, Male = -74, Text = "74 KG", Female_Text = "69 KG" }
            };
            ViewBag.ChartPoints = ChartPoints;
            return View();
        }
        public class NegativeStackChartData
        {
            public string Height;
            public double Female;
            public double Male;
            public string Text;
            public string Female_Text;
        }
    }
}