import re

with open('src/pages/Home.tsx', 'r') as f:
    c = f.read()

c = c.replace('''            ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};''', '''            ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};''') # oh wait it was 3 divs... but wait, the previous state was:

