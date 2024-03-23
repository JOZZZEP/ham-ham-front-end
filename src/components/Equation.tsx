import { Box } from "@mui/system";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const EquationComponent = (props: any) => {
  const p1 = {
    E: props.voteResult.p1.E,
    K: props.voteResult.p1.K,
    pid: props.voteResult.p1.pid,
    point: props.voteResult.p1.point,
    result: props.voteResult.p1.result,
    score: props.voteResult.p1.score,
    total: props.voteResult.p1.total,
  };
  const p2 = {
    E: props.voteResult.p2.E,
    K: props.voteResult.p2.K,
    pid: props.voteResult.p2.pid,
    point: props.voteResult.p2.point,
    result: props.voteResult.p2.result,
    score: props.voteResult.p2.score,
    total: props.voteResult.p2.total,
  };
  return (
    <div>
      {props.isP1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            fontSize: { md: 17,  xs:14 },
          }}
        >
          <Box sx={{ display: "flex", gap: 6 }}>
            <BlockMath math={`R_{\\text{A}}=\\color{brown}{${p1.score}}`} />
            <BlockMath math={`S_{\\text{A}}=${p1.result}`} />
          </Box>
          <BlockMath
            math={`E_{\\text{A}}=\\frac{1}{1+10^{(\\color{magenta}(${p2.score})\\color{black}-\\color{brown}(${p1.score})\\color{black})/400}}=${p1.E}`}
          />
          <BlockMath
            math={`Point_{\\text{A}}=${p1.K}(${p1.result}-${p1.E})=${p1.point}`}
          />
          <BlockMath
            math={`R_{\\text{A}}'=\\color{brown}(${p1.score})\\color{black}+(${p1.point})=\\underline{${p1.total}}`}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            fontSize: { md: 17, xs: 14 },
          }}
        >
          <Box sx={{ display: "flex", gap: 6 }}>
            <BlockMath math={`R_{\\text{B}}=\\color{magenta}${p2.score}`} />
            <BlockMath math={`S_{\\text{B}}=${p2.result}`} />
          </Box>
          <BlockMath
            math={`E_{\\text{B}}=\\frac{1}{1+10^{(\\color{brown}(${p1.score})\\color{black}-\\color{magenta}(${p2.score}\\color{black})/400}}=${p2.E}`}
          />
                    <BlockMath
            math={`Point_{\\text{B}}=${p2.K}(${p2.result}-${p2.E})=${p2.point}`}
          />
          <BlockMath
            math={`R_{\\text{B}}'=\\color{magenta}(${p2.score})\\color{black}+(${p2.point})=\\underline{${p2.total}}`}
          />
        </Box>
      )}
    </div>
  );
};

export default EquationComponent;
