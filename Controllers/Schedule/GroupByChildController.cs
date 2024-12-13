#region Copyright Syncfusion Inc. 2001-2024.
// Copyright Syncfusion Inc. 2001-2024. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using EJ2MVCSampleBrowser.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace EJ2MVCSampleBrowser.Controllers.Schedule
{
    public partial class ScheduleController : Controller
    {
        public ActionResult GroupByChild()
        {
            ViewBag.datasource = new ScheduleData().GetResourceTeamData();

            List<ResourceDataSourceModel> projects = new List<ResourceDataSourceModel>();
            projects.Add(new ResourceDataSourceModel { text = "PROJECT 1", id = 1, color = "#cb6bb2" });
            projects.Add(new ResourceDataSourceModel { text = "PROJECT 2", id = 2, color = "#56ca85" });
            ViewBag.Projects = projects;

            List<ResourceDataSourceModel> categories = new List<ResourceDataSourceModel>();
            categories.Add(new ResourceDataSourceModel { text = "Development", id = 1, color = "#df5286" });
            categories.Add(new ResourceDataSourceModel { text = "Testing", id = 2, color = "#7fa900" });
            ViewBag.Categories = categories;

            ViewBag.Resources = new string[] { "Projects", "Categories" };
            return View();
        }
    }
}