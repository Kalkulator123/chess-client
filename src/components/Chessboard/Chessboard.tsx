import { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Referee from "../../referee/Referee";
import { ServerChess} from '../../services/chess-server.service';
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  PieceType,
  TeamType,
  Position,
  samePosition,
} from "../../Constants";
import { BetterFen } from "../../BetterFen";
import { Console } from "console";
let canMove:boolean = true;
let isWhite = true;
let server = new ServerChess();
let gameId:string = "62656968ecd2f2c6adcd33a8";

export default function Chessboard() {
  const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [promotionPawn, setPromotionPawn] = useState<Piece>();
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 });
  let [pieces, setPieces] = useState<Piece[]>(BetterFen.value);
  const coorditatesList: Array<string> = ["a","b","c","d","e","f","g","h"];
  const chessboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const referee = new Referee();
  function grabPiece(e: React.MouseEvent) {
    if(canMove){
      const element = e.target as HTMLElement;
      const chessboard = chessboardRef.current;
      if (element.classList.contains("chess-piece") && chessboard) {
        const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
        const grabY = Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
        );
        const currentPiece = pieces.find((p) =>
          samePosition(p.position, { x: grabX, y: grabY })
        );
        if((isWhite && currentPiece?.team===TeamType.OUR)||(!isWhite && currentPiece?.team===TeamType.OPPONENT)){
          setGrabPosition({ x: grabX, y: grabY });
  
          const x = e.clientX - GRID_SIZE / 2;
          const y = e.clientY - GRID_SIZE / 2;
          element.style.position = "absolute";  
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          setActivePiece(element);
        }
        
    }
    
    }
  }

  function movePiece(e: React.MouseEvent) {
      const chessboard = chessboardRef.current;
      if (activePiece && chessboard) {
        const minX = chessboard.offsetLeft - 25;
        const minY = chessboard.offsetTop - 25;
        const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
        const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";

        //If x is smaller than minimum amount
        if (x < minX) {
          activePiece.style.left = `${minX}px`;
        }
        //If x is bigger than maximum amount
        else if (x > maxX) {
          activePiece.style.left = `${maxX}px`;
        }
        //If x is in the constraints
        else {
          activePiece.style.left = `${x}px`;
        }

        //If y is smaller than minimum amount
        if (y < minY) {
          activePiece.style.top = `${minY}px`;
        }
        //If y is bigger than maximum amount
        else if (y > maxY) {
          activePiece.style.top = `${maxY}px`;
        }
        //If y is in the constraints
        else {
          activePiece.style.top = `${y}px`;
        }
      }
  }

  function dropPiece(e: React.MouseEvent) {
    if(canMove){
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamType.OUR ? 1 : -1;

        if (isEnPassantMove) {
          canMove = false;
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if (validMove) {
          //UPDATES THE PIECE POSITION
          //AND IF A PIECE IS ATTACKED, REMOVES IT
          canMove = false;
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              //SPECIAL MOVE
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceType.PAWN;
              server.updateGame(gameId, coorditatesList[piece.position.x]+(piece.position.y+1)+coorditatesList[x]+(y+1));
              piece.position.x = x;
              piece.position.y = y;

              let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

              if(y === promotionRow && piece.type === PieceType.PAWN) {
                modalRef.current?.classList.remove("hidden");
                setPromotionPawn(piece);
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }

            return results;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          //RESETS THE PIECE POSITION
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }
  }

  function promotePawn(pieceType: PieceType) {
    if(promotionPawn === undefined) {
      return;
    }

    const updatedPieces = pieces.reduce((results, piece) => {
      if(samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType;
        const teamType = (piece.team === TeamType.OUR) ? "w" : "b";
        let image = "";
        switch(pieceType) {
          case PieceType.ROOK: {
            image = "rook";
            break;
          }
          case PieceType.BISHOP: {
            image = "bishop";
            break;
          }
          case PieceType.KNIGHT: {
            image = "knight";
            break;
          }
          case PieceType.QUEEN: {
            image = "queen";
            break;
          }
        }
        piece.image = `assets/images/${image}_${teamType}.png`;
      }
      results.push(piece);
      return results;
    }, [] as Piece[])

    setPieces(updatedPieces);

    modalRef.current?.classList.add("hidden");
  }

  function promotionTeamType() {
    return (promotionPawn?.team === TeamType.OUR) ? "w" : "b";
  }

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  server.getOne(gameId).then(function(result){
    setFen(result);
    // BetterFen.setFenByString(result)
    // const updatedPieces = pieces.reduce((results, piece) => {
    //   BetterFen.value.forEach(element => {
    //     results.push(element);
    //   });
    //   return results;
    // }, [] as Piece[]);
    // setPieces(updatedPieces);
  });
  function parseFenToArray(fen: string): Piece[] {
    let value: Piece[] = [];
    const fenrow = fen.split('/');

    for (let i = 0; i < fenrow.length; i++) {
        for (let j = 0; j < fenrow[i].length; j++) {
            let char: string = fenrow[i][j];

            if (isNaN(parseInt(char))) {
                let unit = {
                    image: getImage(char),
                    position: {
                        x: j,
                        y: 7-i,
                    },
                    type: getType(char),
                    team: getTeam(char),
                };
                value.push(unit);
                continue;
            }

        }
    }
    return value;
  }
    function getType(char:string):PieceType{
      switch(char.toLowerCase()){
          case "r": return PieceType.ROOK;
          case "n": return PieceType.KNIGHT;
          case "b": return PieceType.BISHOP;
          case "q": return PieceType.QUEEN;
          case "k": return PieceType.KING;
          case "p": return PieceType.PAWN;
      }
      return PieceType.PAWN;
  }
  function getImage(char:string):string{
      switch(char){
          case "r": return `assets/images/rook_b.png`;
          case "n": return `assets/images/knight_b.png`;
          case "b": return `assets/images/bishop_b.png`;
          case "q": return `assets/images/queen_b.png`;
          case "k": return `assets/images/king_b.png`;
          case "p": return `assets/images/pawn_b.png`;
          case "R": return `assets/images/rook_w.png`;
          case "N": return `assets/images/knight_w.png`;
          case "B": return `assets/images/bishop_w.png`;
          case "Q": return `assets/images/queen_w.png`;
          case "K": return `assets/images/king_w.png`;
          case "P": return `assets/images/pawn_w.png`;
      }
      return `assets/images/pawn_w.png`;
  }
  function getTeam(char:string):TeamType{
      if(char===char.toUpperCase())return TeamType.OUR;
      return TeamType.OPPONENT;
  }
  return (
    <>
      <div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
        <div className="modal-body">
          <img onClick={() => promotePawn(PieceType.ROOK)} src={`/assets/images/rook_${promotionTeamType()}.png`}/>
          <img onClick={() => promotePawn(PieceType.BISHOP)} src={`/assets/images/bishop_${promotionTeamType()}.png`}/>
          <img onClick={() => promotePawn(PieceType.KNIGHT)} src={`/assets/images/knight_${promotionTeamType()}.png`}/>
          <img onClick={() => promotePawn(PieceType.QUEEN)} src={`/assets/images/queen_${promotionTeamType()}.png`}/>
        </div>
      </div>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
      <button onClick={()=>{
          const updatedPieces = pieces.reduce((results, piece) => {
            parseFenToArray(fen).forEach(element => {
              results.push(element);
            });
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
      }}></button>
    </>
  );
}
