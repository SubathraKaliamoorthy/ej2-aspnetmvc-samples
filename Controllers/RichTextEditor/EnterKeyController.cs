#region Copyright Syncfusion Inc. 2001-2023.
// Copyright Syncfusion Inc. 2001-2023. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using EJ2CoreSampleBrowser.Models;
using EJ2MVCSampleBrowser.Models;

namespace EJ2MVCSampleBrowser.Controllers
{
    public partial class RichTextEditorController : Controller
    {
        // GET: /<controller>/
        public ActionResult EnterKey()
        {
            ViewBag.EnterData = new FormatOption().EnterOption();
            ViewBag.ShiftEnterData = new FormatOption().ShiftEnterOption();
            return View();
        }
    }
}