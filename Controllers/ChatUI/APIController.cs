#region Copyright Syncfusion® Inc. 2001-2025.
// Copyright Syncfusion® Inc. 2001-2025. All rights reserved.
// Use of this code is subject to the terms of our license.
// A copy of the current license can be obtained at any time by e-mailing
// licensing@syncfusion.com. Any infringement will be prosecuted under
// applicable laws. 
#endregion
using Syncfusion.EJ2.InteractiveChat;
using System.Collections.Generic;
using EJ2MVCSampleBrowser.Models;
using System.Web.Mvc;

namespace EJ2MVCSampleBrowser.Controllers.ChatUI
{
    public partial class ChatUIController
    {
        public List<object> TimeStampFormatOptions { get; set; }
        public List<object> TypingUserOptions { get; set; }
        public object DDBListValue = "MM/dd hh:mm a";
        public List<ChatUIMessage> CommunityMessagedata { get; set; }
        public ActionResult API()
        {

            CommunityMessagedata = new ChatMessagesData().GetCommunityMessageData();
            TimeStampFormatOptions = new List<object>
            {
                new { text = "MM/dd hh:mm a", value = "MM/dd hh:mm a" },
                new { text = "dd/MM/yy hh:mm a", value = "dd/MM/yy hh:mm a" },
                new { text = "hh:mm a", value = "hh:mm a" },
                new { text = "MMMM hh:mm a", value = "MMMM hh:mm a" }
            };
            TypingUserOptions = new List<object>
            {
                new { text = "Michale", value = "Michale" },
                new { text = "Laura", value = "Laura" },
                new { text = "Charlie", value = "Charlie" }
            };
            ViewBag.CommunityMessagedata = CommunityMessagedata;
            ViewBag.TimeStampFormatOptions = TimeStampFormatOptions;
            ViewBag.TypingUserOptions = TypingUserOptions;
            ViewBag.DDBListValue = DDBListValue;
            return View();
        }
    }
}