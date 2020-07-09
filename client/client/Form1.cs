using System;
using System.Collections.Generic;
using System.ComponentModel;
using AxZKFPEngXControl;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;

namespace client
{
    public partial class Form1 : Form
    {
        private AxZKFPEngX ZkFprint = new AxZKFPEngX();
        private string Argument;
        private string current_finger;
        private string list_finger;
        private bool Check;
        public Form1(string[] Args)
        {
            this.WindowState = FormWindowState.Minimized;
            InitializeComponent();
            if (Args.Length == 1)
            {
                Argument = Args[0];
            }
            else if(Args.Length == 3)
            {
                Argument = Args[0];
                current_finger = Args[1];
                list_finger = Args[2];
            }
            
        }

        private void InitialAxZkfp()
        {
            try
            {
                ZkFprint.OnCapture += zkFprint_OnCapture;
                if (ZkFprint.InitEngine() == 0)
                {
                    ZkFprint.FPEngineVersion = "10";
                    ZkFprint.EnrollCount = 3;
                }
                else
                {
                    ZkFprint.EndEngine();
                }
            }
            catch (Exception e)
            {
                //device_status.Text = "device init error: " + e.Message;
            }
        }

        private void zkFprint_OnCapture(object sender, IZKFPEngXEvents_OnCaptureEvent e)
        {
            string template = ZkFprint.EncodeTemplate1(e.aTemplate);
            WriteText("current_finger", template);
            ZkFprint.CancelCapture();
            Application.Exit();
        }

        private void VerifyFinger(string finger, string list)
        {
            bool match = false;
            //string[] fingerList = { "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" };
            string[] fingerList = list.Split(',');
            string matchFinger = "";
            foreach (string fn in fingerList)
            {
                if (ZkFprint.VerFingerFromStr(ref finger, fn, false, ref Check))
                {
                    match = true;
                    matchFinger = fn;
                }
            }
            if(match)
            {
                WriteText("result", matchFinger);
            }
            else
            {
                WriteText("result","false");
            }
            Application.Exit();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Controls.Add(ZkFprint);
            InitialAxZkfp();
            Hide();
            switch (Argument)
            {
                case "get_finger":
                    ZkFprint.BeginCapture();
                    break;
                case "verify_finger":
                    VerifyFinger(current_finger, list_finger);
                    break;
            }
        }

        public void WriteText(string tag, string result)
        {
            FileInfo fileusername = new FileInfo($"{tag}.txt");
            StreamWriter namewriter = fileusername.CreateText();
            namewriter.Write($"{result}");
            namewriter.Close();
        }
    }
}
