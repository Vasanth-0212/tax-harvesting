export async function GET(request) {
  const capitalGains = {
    stcg: {
      profits: 100,
      losses: 500,
    },
    ltcg: {
      profits: 1200,
      losses: 100,
    },
  };

  return Response.json(capitalGains);
}
