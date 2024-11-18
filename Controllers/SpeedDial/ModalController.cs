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
using Syncfusion.EJ2.Buttons;

namespace EJ2MVCSampleBrowser.Controllers
{
    public partial class SpeedDialController : Controller
    {
        public ActionResult Modal()
        {
            List<SpeedDialItem> items = new List<SpeedDialItem>();
            items.Add(new SpeedDialItem
            {
                Title ="Home",
                IconCss = "speeddial-icons speeddial-icon-house"
            });
            items.Add(new SpeedDialItem
            {
                Title="People",
                IconCss = "speeddial-icons speeddial-icon-people"
            });
            items.Add(new SpeedDialItem
            {
                Title="Search",
                IconCss = "speeddial-icons speeddial-icon-search"
            });
            items.Add(new SpeedDialItem
            {
                Title="Message",
                IconCss = "speeddial-icons speeddial-icon-message"
            });
            ViewBag.datasource = items;
            return View();
        }
    }

}