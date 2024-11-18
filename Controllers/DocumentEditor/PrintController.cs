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
using Syncfusion.EJ2.Navigations;

namespace EJ2MVCSampleBrowser.Controllers.DocumentEditor
{
    public partial class DocumentEditorController : Controller
    {
        public ActionResult Print()
        {
            this.StatusBar();
            return View();
        }

        public PartialViewResult StatusBar()
        {
            List<object> zoomItems = new List<object>();
            zoomItems.Add(new { text = "200%" });
            zoomItems.Add(new { text = "175%" });
            zoomItems.Add(new { text = "150%" });
            zoomItems.Add(new { text = "125%" });
            zoomItems.Add(new { text = "100%" });
            zoomItems.Add(new { text = "75%" });
            zoomItems.Add(new { text = "50%" });
            zoomItems.Add(new { text = "25%" });
            zoomItems.Add(new { separator = true });
            zoomItems.Add(new { text = "Fit one page" });
            zoomItems.Add(new { text = "Fit page width" });
            ViewBag.zoomList = zoomItems;
            return PartialView();
        }
    }
}
