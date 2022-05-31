import { useRef } from "react";
import "./Tile.css";

interface Props {
	image?: string;
	number: number;
	key1: string;
}

export default function Tile({ key1, number, image }: Props) {
	if (number % 2 === 0) {
		return (
			<div className="tile black-tile">
				{image && (
					<div
						style={{ backgroundImage: `url(${image})` }}
						className="chess-piece positionForPieceFixed"></div>
				)}
				<text className="notationText">{key1}</text>
			</div>
		);
	} else {
		return (
			<div className="tile white-tile">
				{image && (
					<div
						style={{ backgroundImage: `url(${image})` }}
						className="chess-piece positionForPieceFixed"></div>
				)}
				<text className="notationText">{key1}</text>
			</div>
		);
	}
}
