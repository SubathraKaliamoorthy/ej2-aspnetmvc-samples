#region Copyright Syncfusion Inc. 2001-2024.
// Copyright Syncfusion Inc. 2001-2024. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using Syncfusion.EJ2.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EJ2MVCSampleBrowser.Controllers.Spreadsheet
{
    public partial class SpreadsheetController : Controller
    {
        // GET: ProtectSheet
        public ActionResult ProtectSheet()
        {
            List<object> data = new List<object>()
            {
                new { Tenure= "1",  PaymentDate= "03-04-2020",  EMI= "8698.84",  Prinicpal= "8032.18",  Interest= "666.67",  Balance= "91967.82" },
                new { Tenure= "2",  PaymentDate= "03-05-2020",  EMI= "8698.84",  Prinicpal= "8085.72",  Interest= "616.12",  Balance= "83882.10" },
                new { Tenure= "3",  PaymentDate= "03-06-2020",  EMI= "8698.84",  Prinicpal= "8139.63",  Interest= "559.21",  Balance= "75742.47" },
                new { Tenure= "4",  PaymentDate= "03-07-2020",  EMI= "8698.84",  Prinicpal= "8193.89",  Interest= "504.95",  Balance= "67548.58" },
                new { Tenure= "5",  PaymentDate= "03-08-2020",  EMI= "8698.84",  Prinicpal= "8248.52",  Interest= "450.32",  Balance= "59300.06" },
                new { Tenure= "6",  PaymentDate= "03-09-2020",  EMI= "8698.84",  Prinicpal= "8303.51",  Interest= "395.33",  Balance= "50996.55" },
                new { Tenure= "7",  PaymentDate= "03-10-2020",  EMI= "8698.84",  Prinicpal= "8358.87",  Interest= "339.98",  Balance= "42637.68" },
                new { Tenure= "8",  PaymentDate= "03-11-2020",  EMI= "8698.84",  Prinicpal= "8414.59",  Interest= "284.25",  Balance= "34223.09" },
                new { Tenure= "9",  PaymentDate= "03-12-2020",  EMI= "8698.84",  Prinicpal= "8470.69",  Interest= "228.15",  Balance= "25752.40" },
                new { Tenure= "10",  PaymentDate= "03-01-2021",  EMI= "8698.84",  Prinicpal= "8527.16",  Interest= "171.68",  Balance= "17225.24" },
                new { Tenure= "11",  PaymentDate= "03-02-2021",  EMI= "8698.84",  Prinicpal= "8584.01",  Interest= "114.83",  Balance= "8641.23" },
                new { Tenure= "12",  PaymentDate= "03-03-2021",  EMI= "8698.84",  Prinicpal= "8641.23",  Interest= "57.61",  Balance= "0.00" },
            };
            ViewBag.ProtectSheetData = data;
            return View();
        }

        public ActionResult ProtectSheetOpen(OpenRequest openRequest)
        {
            return Content(Workbook.Open(openRequest));
        }

        public void ProtectSheetSave(SaveSettings saveSettings)
        {
            Workbook.Save(saveSettings);
        }
    }
}