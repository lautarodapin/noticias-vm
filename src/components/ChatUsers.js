import React, { Component, useState, useEffect} from "react";
import {List, ListItem, 
    Grid, Paper,Button, ButtonGroup, Typography, Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
} from "react-router-dom";
/*
*
*/
function ChatUsers({data}) { // se puede usar props sin llaves tmb
	const params = useParams(); // contiene los parametros del url
	console.log("Chat users", data);
	return (
		<Paper style={{maxHeight: 200, overflow: 'auto'}}>
			<List>
			{data?.map((user)=>
				(
					<ListItem>
					<Card variant="outlined" className="mb-5" id={user.id}>
						<CardContent>
							<Typography>
								{user.username}
							</Typography>
						</CardContent>
					</Card>
						</ListItem>
				)
			)}
				</List>
		</Paper>
	);
}
export default ChatUsers;