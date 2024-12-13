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
        // GET: Funnel
        public ActionResult Funnel()
        {
            List<FunnelChartData> ChartPoints = new List<FunnelChartData>
            {
                new FunnelChartData { InterviewProcess = "Hired",                Candidates = 55,  DataLabelMappingName = "Hired: 55" },
                new FunnelChartData { InterviewProcess = "Personal Interview",   Candidates = 58,  DataLabelMappingName = "Personal Interview: 58" },
                new FunnelChartData { InterviewProcess = "Telephonic Interview", Candidates = 85,  DataLabelMappingName = "Telephonic Interview: 85" },                
                new FunnelChartData { InterviewProcess = "Screening",            Candidates = 105, DataLabelMappingName = "Screening: 105" },
                new FunnelChartData { InterviewProcess = "Initial Validation",   Candidates = 145, DataLabelMappingName = "Initial Validation: 145" },
                new FunnelChartData { InterviewProcess = "Candidates Applied",   Candidates = 250, DataLabelMappingName = "Candidates Applied: 250" }
            };
            ViewBag.ChartPoints = ChartPoints;
            return View();
        }
        public class FunnelChartData
        {
            public string InterviewProcess;
            public double Candidates;
            public string DataLabelMappingName;
        }
    }
}