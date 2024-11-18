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
        // GET: StackedColumn
        public ActionResult StackedColumn()
        {
            List<StackedColumnChartData> ChartPoints = new List<StackedColumnChartData>
            {
                new StackedColumnChartData { Year = "2013", General = 9628912, Honda = 4298390, Suzuki = 2842133, BMW = 2006366 },
                new StackedColumnChartData { Year = "2014", General = 9609326, Honda = 4513769, Suzuki = 3016710, BMW = 2165566 },
                new StackedColumnChartData { Year = "2015", General = 7485587, Honda = 4543838, Suzuki = 3034081, BMW = 2279503 },
                new StackedColumnChartData { Year = "2016", General = 7793066, Honda = 4999266, Suzuki = 2945295, BMW = 2359756 },
                new StackedColumnChartData { Year = "2017", General = 6856880, Honda = 5235842, Suzuki = 3302336, BMW = 2505741 },
            };
            ViewBag.ChartPoints = ChartPoints;
            return View();
        }
        public class StackedColumnChartData
        {
            public string Year;
            public double General;
            public double Honda;
            public double Suzuki;
            public double BMW;
        }
    }
}