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
        // GET: PieRadius
        public ActionResult PieRadius()
        {
            List<PieRadiusChartData> ChartPoints = new List<PieRadiusChartData>
            {
                new PieRadiusChartData { Country = "Argentina",          Population = 505370,  Radius = "100",   text = "Argentina" },
                new PieRadiusChartData { Country = "Cuba",               Population = 312685 , Radius = "124.6", text = "Cuba" },
                new PieRadiusChartData { Country = "Belgium",            Population = 551500,  Radius = "118.7", text = "Belgium" },                
                new PieRadiusChartData { Country = "Dominican Republic", Population = 350000 , Radius = "137.5", text = "Dominican Republic" },
                new PieRadiusChartData { Country = "Egypt",              Population = 301000 , Radius = "150.8", text = "Egypt" },
                new PieRadiusChartData { Country = "Kazakhstan",         Population = 300000,  Radius = "155.5", text = "Kazakhstan" },
                new PieRadiusChartData { Country = "Somalia",            Population = 357022,  Radius = "160.6", text = "Somalia" }
            };
            ViewBag.ChartPoints = ChartPoints;
            return View();
        }
        public class PieRadiusChartData
        {
            public string Country;
            public double Population;
            public string Radius;
            public string text;
            
        }
    }
}