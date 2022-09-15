import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";
import "./style.css";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.2/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const apiKey = process.env.REACT_APP_API_KEY;
const urlCallback = process.env.REACT_APP_DOMAIN_URL;

const Zoom = ({ role, meetingNumber, username, userEmail, password }) => {
  debugger;
  useEffect(() => {
    getSignature();
  }, []);

  const getSignature = () => {
    //testvu.tedesco.es
    fetch(
      `http://localhost:5000/v1/api/zoom/getSignature?meetingNumber=${meetingNumber}&role=${role}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startMeeting = (signature) => {
    debugger;
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: urlCallback,
      meetingInfo: [ // optional
        'topic',
        'host',
        'mn',
        'pwd',
        'telPwd',
        'invite',
        'participant',
        'dc',
        'enctype',
        'report'
      ],
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: username,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: password,
          success: (_success) => {
            //Obtenemos informcion de la meet
            ZoomMtg.getCurrentMeetingInfo({
              success: function (res) {
                console.log("success getCurrentMeetingInfo", res.result);
              },
            });

            //Obtenemos lista de participantes de la meet
            ZoomMtg.getAttendeeslist({
              success: function (res) {
                console.log("success getAttendeeslistInfo", res.result);
                //Muteamos a un participante en especifico
                ZoomMtg.mute({
                  userId: res.result.attendeesList.find(user => user.userId === 16778240).userId,
                  mute: true,
                });
              },
            });
            //Se intenta mutear a todos, no quiere.
            ZoomMtg.muteAll({
              muteAll: true,
            });

            //Se obtiene data del usuario actual.
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUserInfo", res.result);
              },
            });
          },
          error: (_error) => {
            console.log(_error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  return <div>Zoom</div>;
};

export default Zoom;
